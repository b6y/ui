import React from "react";

import MonacoEditor from "@b6y/react-monaco-editor";

import { withTheme } from "emotion-theming";
import * as R from "ramda";

interface Props {
  extraLibs?: { [name: string]: string };
  name?: string;
  mode: string;
  value: null | string;
  onChange?: (value: any) => void;
  onBlur?: () => void;
}

interface State {}

class AceInput extends React.PureComponent<Props, State> {
  // HAHA.
  public isMounted: boolean = false;

  constructor(props: Props, context: any) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  public componentDidMount() {
    this.isMounted = true;
  }

  public componentWillUnmount(): void {
    this.isMounted = false;
  }

  public onChange(value: any) {
    if (R.isNil(value)) {
      if (this.props.onChange) {
        this.props.onChange(null);
      }
    } else {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }

  public onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  public render() {
    return (
      <div>
        <MonacoEditor
          height="500"
          language="typescript"
          theme="vs-dark"
          value={this.props.value}
          onChange={this.onChange}
          options={{fontFamily: "monospace"}}
          extraLibs={this.props.extraLibs}
          // editorDidMount={::this.editorDidMount}
        />
        {/*
        <AceEditor
          enableBasicAutocompletion={true}
          name={this.props.name}
          value={this.props.value}
          mode={this.props.mode}
          theme="solarized_light"
          width="100%"
          onChange={this.onChange}
          onBlur={this.props.onBlur}
          editorProps={{$blockScrolling: true}}
          setOptions={{useWorker: false}}
        />
        */}
        {/*
        <AsyncSelect
          components={{ Option: CustomOption, SingleValue: CustomDisplayOption, MenuList }}
          loadOptions={(text) => options.search(text, this.props)}
          defaultOptions={true}
          cacheOptions
          styles={customStyles(2, theme)}
          name={field.name}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={loading ? null : option}
          inputId={id}
          isClearable={isClearable}
          isSearchable={!loading}
          menuPortalTarget={portalDOM}
          isLoading={loading}
          isDisabled={loading}
          placeholder={loading ? "Carregando..." : "Selecione..."}
        />
        */}
      </div>
    );
  }
}

export default withTheme(AceInput);
